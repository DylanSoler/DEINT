using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(chatdylanService.Startup))]

namespace chatdylanService
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureMobileApp(app);
            app.MapSignalR();
        }
    }
}