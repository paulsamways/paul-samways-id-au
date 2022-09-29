namespace PaulSamways.Models
{
    public class Skill
    {
        public Skill()
            : this(string.Empty, string.Empty, Array.Empty<string>())
        {
        }

        public Skill(string name, string image, IEnumerable<string>? projects = null)
        {
            Name = name;
            Image = image;
            Projects = projects;
            Children = new List<Skill>();
        }

        public string Name { get; set; }
        public string Image { get; set; }
        public string? Description { get; set; }
        public int? Level { get; set; }
        public IEnumerable<string>? Projects { get; set; }
        public IList<Skill> Children { get; set; }

        public IEnumerable<Skill> LeafNodes()
        {
            if (Children.Count == 0)
                yield return this;

            foreach (var children in Children)
            {
                foreach (var node in children.LeafNodes())
                {
                    yield return node;
                }
            }
        }
    }
}
