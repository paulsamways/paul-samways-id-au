using YamlDotNet.Serialization;

namespace PaulSamways.Models
{
    public class SkillCategory
    {
        public SkillCategory()
            : this(string.Empty, Array.Empty<Skill>())
        {
        }

        public SkillCategory(string name, IEnumerable<Skill> skills)
        {
            Name = name;
            Skills = skills;
        }

        [YamlMember(Alias = "category")]
        public string Name { get; set; }

        public string? Description { get; set; }
        public IEnumerable<Skill> Skills { get; set; }
    }
}
