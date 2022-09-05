namespace PaulSamways.Models
{
    public class Skill
    {
        public Skill()
            : this(string.Empty, string.Empty, string.Empty, Array.Empty<string>())
        {
        }

        public Skill(string name, string imageUrl, string description, IEnumerable<string> projects)
        {
            Name = name;
            ImageUrl = imageUrl;
            Description = description;
            Projects = projects;
        }

        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public IEnumerable<string> Projects { get; set; }
    }
}
