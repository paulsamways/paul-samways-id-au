using Microsoft.AspNetCore.Mvc.RazorPages;
using PaulSamways.Models;
using PaulSamways.Services;

namespace PaulSamways.Pages;

public class ResumeModel : PageModel
{
    private readonly ILogger<ResumeModel> _logger;
    private readonly DataService _data;

    public ResumeModel(ILogger<ResumeModel> logger, DataService data)
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
