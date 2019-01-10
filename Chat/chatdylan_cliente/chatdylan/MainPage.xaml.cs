using chatdylan.DataModel;
using Microsoft.WindowsAzure.MobileServices;
using System;
using System.Threading.Tasks;
using Windows.UI.Popups;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Navigation;


namespace chatdylan
{
    public sealed partial class MainPage : Page
    {

        public MainPage()
        {
            this.InitializeComponent();
            this.DataContext = (Application.Current as App).ChatVM;
        }

        private void send_Click(object sender, RoutedEventArgs e)
        {
            (Application.Current as App).Broadcast(new ChatMessage { Username = name.Text, Message = text.Text });
        }

    }
}
