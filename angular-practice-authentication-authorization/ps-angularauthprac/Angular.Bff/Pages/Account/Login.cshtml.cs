using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Angular.Bff.Pages.Account;

[AllowAnonymous]
public class Login : PageModel
{
    [BindProperty] public string Username { get; set; } = "";
    [BindProperty] public string Password { get; set; } = "";


    public IActionResult OnGet(string returnUrl)
    {
        return Page();
    }
        
    public async Task<IActionResult> OnPost()
    {
        if (!ModelState.IsValid) return Page();
        
        if (Username.ToLower() == "bob" && Password.ToLower() == "bob")
        {
            var claims = new[]
            {
                new Claim("name", "Bob"),
                new Claim("sub", "1"),
                new Claim("role", "admin")
            };
                
            var identity = new ClaimsIdentity(claims, "pwd", 
                ClaimTypes.Name, ClaimTypes.Role);
            await HttpContext.SignInAsync(new ClaimsPrincipal(identity));
                
            return Redirect("~/");
        }
            
        ModelState.AddModelError(string.Empty, "Invalid login attempt.");

        // something went wrong, show form with error
        return Page();
    }
}