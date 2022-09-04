namespace PaulSamways.Models
{
    public class Project
    {
        public Project()
            : this(string.Empty, string.Empty)
        {
        }

        public Project(string name, string description)
        {
            Name = name;
            Description = description;
        }

        public string Name { get; set; }
        public string? Url { get; set; }
        public string? Picture { get; set; }
        public string? PictureUrl { get; set; }
        public string Description { get; set; }
    }
}
