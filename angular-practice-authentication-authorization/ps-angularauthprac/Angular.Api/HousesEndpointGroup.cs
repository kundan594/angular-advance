using System.Security.Claims;
using Microsoft.AspNetCore.Http.Extensions;

namespace Angular.Api;

public static class HousesEndpointGroup
{
   private static readonly List<House> Data =
   [
       new()
       {
           Id = 1,
           Address = "12 Valley of Kings, Geneva",
           Country = "Switzerland",
           Description =
               "A superb detached Victorian property on one of the town's finest roads, within easy reach of Barnes Village. The property has in excess of 6000 sq/ft of accommodation, a driveway and landscaped garden.",
           Price = 900000,
           Photo = "277667"
       },

       new()
       {
           Id = 2,
           Address = "89 Road of Forks, Bern",
           Country = "Switzerland",
           Description =
               "This impressive family home, which dates back to approximately 1840, offers original period features throughout and is set back from the road with off street parking for up to six cars and an original Coach House, which has been incorporated into the main house to provide further accommodation. ",
           Price = 500000,
           Photo = "462358"
       },

       new()
       {
           Id = 3,
           Address = "Grote Hof 12, Amsterdam",
           Country = "The Netherlands",
           Description =
               "This house has been designed and built to an impeccable standard offering luxurious and elegant living. The accommodation is arranged over four floors comprising a large entrance hall, living room with tall sash windows, dining room, study and WC on the ground floor.",
           Price = 200500,
           Photo = "259600"
       },

       new()
       {
           Id = 4,
           Address = "Meel Kade 321, The Hague",
           Country = "The Netherlands",
           Description =
               "Discreetly situated a unique two storey period home enviably located on the corner of Krom Road and Recht Road offering seclusion and privacy. The house features a magnificent double height reception room with doors leading directly out onto a charming courtyard garden.",
           Price = 259500,
           Photo = "534182"
       },

       new()
       {
           Id = 5,
           Address = "Oude Gracht 32, Utrecht",
           Country = "The Netherlands",
           Description =
               "This luxurious three bedroom flat is contemporary in style and benefits from the use of a gymnasium and a reserved underground parking space.",
           Price = 400500,
           Photo = "164558"
       }
   ];

    public static RouteGroupBuilder HousesGroup(this RouteGroupBuilder group)
    {
        // GET
        group.MapGet("/", () => Data);
        group.MapGet("/{id}", (int id) =>
        {
            return Data.FirstOrDefault(x => x.Id == id);
        });

        // POST
        group.MapPost("/", (House model, ClaimsPrincipal user, HttpContext context) =>
        {
            model.Id = House.NewId();
            Data.Add(model);

            var url = new Uri($"{context.Request.GetEncodedUrl()}/{model.Id}");

            return Results.Created(url, model);
        });

        return group;
    }
}

public record House
{
    static int _nextId = 6;
    public static int NewId()
    {
        return _nextId++;
    }
    public int Id { get; set; }
    public string? Address { get; init; }
    public string? Country { get; init; }
    public string? Description { get; init; }
    public int Price { get; init; }
    public string? Photo { get; init; }
}
