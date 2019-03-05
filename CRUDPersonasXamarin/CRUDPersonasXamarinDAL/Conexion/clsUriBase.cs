using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRUDPersonasXamarinDAL.Conexion
{
    public class clsUriBase
    {

        private static String _UriBaseApi = "https://08-apirestpersonas-api20190108022212.azurewebsites.net/api";

        /// <summary>
        /// Devuelve un String con la URI de la api
        /// </summary>
        /// <returns>String uri de la api</returns>
        public String getUriBaseApi() {

            return _UriBaseApi;
        }

    }
}
