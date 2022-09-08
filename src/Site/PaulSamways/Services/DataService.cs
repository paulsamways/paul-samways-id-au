using Microsoft.Extensions.Primitives;
using PaulSamways.Models;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace PaulSamways.Services
{
    public sealed class DataService
    {
        private const string ExperienceYaml = "Data/experience.yaml";
        private const string SkillsYaml = "Data/skills.yaml";


        private readonly ILogger<DataService> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public DataService(ILogger<DataService> logger, IWebHostEnvironment webHostEnvironment)
        {
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;

            Positions = Array.Empty<Position>();
            Projects = new Dictionary<string, Project>();
            Skills = new Skill();

            Load();
            ChangeToken.OnChange(() => _webHostEnvironment.ContentRootFileProvider.Watch("Data/*"), Load);
        }

        public IEnumerable<Position> Positions { get; private set; }
        public IReadOnlyDictionary<string, Project> Projects { get; private set; }
        public Skill Skills { get; private set; }

        public void Load()
        {
            _logger.LogInformation("Loading data from Yaml");

            Positions = FromYaml<IEnumerable<Position>>(ExperienceYaml);
            Skills = FromYaml<Skill>(SkillsYaml);

            Projects = Positions
                .SelectMany(x => x.Projects)
                .ToDictionary(x => x.Id);
        }

        public T FromYaml<T>(string path)
        {
            using var stream = _webHostEnvironment
                .ContentRootFileProvider
                .GetFileInfo(path)
                .CreateReadStream();

            using var reader = new StreamReader(stream);

            var yaml = new DeserializerBuilder()
                .WithNamingConvention(CamelCaseNamingConvention.Instance)
                .Build();

            return yaml.Deserialize<T>(reader);
        }
    }
}
