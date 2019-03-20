using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Mvc;

namespace WebApplication1
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Configuration et services API Web
            config.EnableCors();
            // Itinéraires de l'API Web
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "LoginApi",
                routeTemplate: "api/{controller}/login/{login}",
                defaults: new { controller = "User", action = "GetWithLogin" }
            );

            config.Routes.MapHttpRoute(
                name: "GroupedPricesApi",
                routeTemplate: "api/{controller}/order/{value}",
                defaults: new { controller = "PriceToWin", action = "OrderBy" }
            );

            config.Routes.MapHttpRoute(
                name: "CheckUsersExistingApi",
                routeTemplate: "api/{controller}/usercheck/{value1}/{value2}",
                defaults: new { controller = "User", action = "CheckIfExists" }
            );
        }
    }
}
