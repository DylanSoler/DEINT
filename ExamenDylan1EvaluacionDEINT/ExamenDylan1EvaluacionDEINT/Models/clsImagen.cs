using ExamenDylan1EvaluacionDEINT.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExamenDylan1EvaluacionDEINT.Models
{
    /// <summary>
    /// Clase clsImagen, contiene el numero de la imagen, la ruta y bool para indicar si se ha pulsado o no
    /// </summary>
    public class clsImagen:clsVMBase
    {
        #region Propiedades
        public int numero { get; set; }
        //Debe notificar el cambio a la vista
        private String _ruta;
        public String ruta
        {

            get { return _ruta; }

            set { _ruta = value;
                NotifyPropertyChanged("ruta");
            }

        }
        #endregion

        #region Constructor por defecto
        public clsImagen(int num, String ruta){

            this.numero = num;
            this.ruta = ruta;

        }
        #endregion
    }
}
