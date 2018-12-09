using _17_CRUDPersonasUWP_API_DAL.Conexion;
using _17_CRUDPersonasUWP_API_Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Net;
using System.IO;

namespace _17_CRUDPersonasUWP_API_DAL.Listados
{
    public class clsListadosPersonasDAL
    {

        /// <summary>
        /// Metodo que devuelve el listado completo de personas
        /// </summary>
        /// <returns>List de clsPersona</returns>
        public async Task<List<clsPersona>> listadoCompletoPersonasDAL()
        {
            clsUriBase uribase = new clsUriBase();
            String ruta = uribase.getUriBaseApi();

            List<clsPersona> listado = new List<clsPersona>();

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(ruta);

            HttpResponseMessage response = await client.GetAsync("/api/Personas");

            if (response.IsSuccessStatusCode)
            {
                string lista = await response.Content.ReadAsStringAsync();
                listado = JsonConvert.DeserializeObject<List<clsPersona>>(lista);

            }
            else
            {
                //TODO
            }

            return listado;
        }

    }
}
