// Copyright (c) Duende Software. All rights reserved.
// Licensed under the MIT License. See LICENSE in the project root for license information.

using Angular.Api;
using Duende.Bff.Yarp;
using Microsoft.IdentityModel.JsonWebTokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddBff()
    .AddRemoteApis();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "cookie";
    // Comment the next 2 lines in to use OpenID Connect
    // Comment out to use BFF cookies only
    // options.DefaultChallengeScheme = "oidc";
    // options.DefaultSignOutScheme = "oidc";
}).AddCookie("cookie", options =>
{
    options.Cookie.Name = "__Host-bff";
    options.Cookie.SameSite = SameSiteMode.Strict;
}).AddOpenIdConnect("oidc", options =>
{
    options.Authority = "https://demo.duendesoftware.com";
    options.ClientId = "interactive.confidential";
    options.ClientSecret = "secret";
    options.ResponseType = "code";
    options.ResponseMode = "query";

    options.GetClaimsFromUserInfoEndpoint = true;
    options.MapInboundClaims = false;
    options.SaveTokens = true;

    options.Scope.Clear();
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("api");
    options.Scope.Add("offline_access");

    options.TokenValidationParameters = new()
    {
        NameClaimType = "name",
        RoleClaimType = "role"
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseStaticFiles();
app.UseBff();
app.MapBffManagementEndpoints();

// Comment this in to use API endpoints internal to the BFF
app.MapGroup("/api/houses")
    .HousesGroup()
    .RequireAuthorization()
    .AsBffApiEndpoint();

app.MapRazorPages();

//Comment this in to use API endpoints external to the BFF
//This can only be used with OpenID Connect enabled above (access token needed)
// app.MapRemoteBffApiEndpoint("/api", "https://localhost:7001")
//     .RequireAccessToken();

app.MapFallbackToFile("/index.html");

app.Run();

