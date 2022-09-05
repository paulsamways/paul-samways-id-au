using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace PaulSamways.Models
{
    public class Position
    {
        public Position()
            : this(string.Empty, string.Empty, string.Empty)
        {
        }

        public Position(string name, string organisation, string startDate)
        {
            Name = name;
            Organisation = organisation;
            StartDate = startDate;

            Responsibilities = new List<string>();
            Projects = new List<Project>();
        }

        public string Name { get; set; }
        public string Organisation { get; set; }
        public string? OrganisationUrl { get; set; }
        public string StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? Description { get; set; }
        public IList<string> Responsibilities { get; set; }
        public IList<Project> Projects { get; set; }
    }
}
