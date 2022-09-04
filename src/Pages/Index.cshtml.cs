using Microsoft.AspNetCore.Mvc.RazorPages;
using PaulSamways.Models;

namespace PaulSamways.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public IndexModel(ILogger<IndexModel> logger, IWebHostEnvironment webHostEnvironment)
    {
        _logger = logger;
        _webHostEnvironment = webHostEnvironment;

        Positions = Array.Empty<Position>();
    }

    public IEnumerable<Position> Positions { get; set; }

    public void OnGet()
    {
        using var stream = _webHostEnvironment.ContentRootFileProvider.GetFileInfo("Data/experience.yaml").CreateReadStream();
        using var reader = new StreamReader(stream);
        Positions = Position.FromYaml(reader);
    }
}
