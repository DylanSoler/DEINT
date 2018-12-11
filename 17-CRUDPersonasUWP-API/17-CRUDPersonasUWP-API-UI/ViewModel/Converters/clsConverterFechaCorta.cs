using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Xaml.Data;

namespace _17_CRUDPersonasUWP_API_UI.ViewModel.Converters
{
    public class clsConverterFechaCorta: IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, string language)
        {

            DateTime fechaCorta = (DateTime)value;
            String fecha = fechaCorta.ToShortDateString();

            return fecha;
        }

        public object ConvertBack(object value, Type targetType, object parameter, string language)
        {
            DateTime fecha = DateTime.Parse(value.ToString());

            return fecha;
        }
    }
}
