﻿using Microsoft.AspNetCore.Mvc.RazorPages;
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

    public IEnumerable<Position> Positions { get; set; }

    public IEnumerable<SkillCategory> Skills { get; set; }

    public void OnGet()
    {
        Positions = _data.Positions;
        Skills = _data.Skills;
    }
}
