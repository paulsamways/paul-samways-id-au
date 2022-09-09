using Microsoft.AspNetCore.DataProtection;
using PaulSamways.Services;

namespace PaulSamways
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var b = WebApplication.CreateBuilder(args);

            var dpPath = b.Configuration.GetSection("DataProtection")["KeyPath"];
            if (!string.IsNullOrEmpty(dpPath))
            {
                b.Services
                    .AddDataProtection()
                    .PersistKeysToFileSystem(new DirectoryInfo(dpPath));
            }

            b.Services.AddRouting(options => options.LowercaseUrls = true);
            b.Services.AddSingleton<DataService>();
            b.Services.AddRazorPages();

            var app = b.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
                app.UseExceptionHandler("/Error");
            }

            app.UseStatusCodePagesWithReExecute("/Error");
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.MapRazorPages();
            app.Run();
        }
    }
}
