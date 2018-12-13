using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Xaml.Data;

namespace _17_CRUDPersonasUWP_API_UI.ViewModel.Converters
{
    public class clsConverterVisibility:IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, string language)
        {
            bool isNotCompleted = (bool)value;
            String vis;

            if (isNotCompleted) {
                vis = "Visible";
            } else {
                vis = "Collapsed";
            }

            return vis;
        }

        public object ConvertBack(object value, Type targetType, object parameter, string language)
        {
            throw new NotImplementedException();
        }
    }
}
