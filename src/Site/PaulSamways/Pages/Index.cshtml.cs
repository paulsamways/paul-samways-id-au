using Microsoft.AspNetCore.Mvc.RazorPages;
using PaulSamways.Models;
using PaulSamways.Services;

namespace PaulSamways.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;
    private readonly DataService _data;

    public IndexModel(ILogger<IndexModel> logger, DataService data)
    {
        _logger = logger;
        _data = data;

        Positions = Array.Empty<Position>();
    }

    public Position[] Positions { get; set; }

    public Skill Skills { get; set; }

    public void OnGet()
    {
        Positions = _data.Positions.ToArray();
        Skills = _data.Skills;
    }
}
