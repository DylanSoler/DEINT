using _14_CRUDPersonasUWP_DAL.Conexion;
using _14_CRUDPersonasUWP_Entidades;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _14_CRUDPersonasUWP_DAL.Listados
{
    /// <summary>
    /// Clase que contiene distintas funciones que devuelven diferentes listados de departamentos
    /// </summary>
    public class clsListadoDepartamentos_DAL
    {

        /// <summary>
        /// Función que devuelve un listado completo de departamentos, vacio si no hay datos o si ha habido un error
        /// </summary>
        /// <returns>List de clsDepartamentos</returns>
        public List<clsDepartamento> listadoCompletoDepartamentos_DAL()
        {

            List<clsDepartamento> listaDepart = new List<clsDepartamento>();

            SqlConnection miConexion = new SqlConnection();
            SqlCommand miComando = new SqlCommand();
            SqlDataReader miLector = null;
            clsDepartamento oDepartamento;
            clsMyConnection gestConexion = new clsMyConnection();

            try //no obligatorio porque lo controlamos en la clase clsMyConnection
            {
                miConexion = gestConexion.getConnection();
                miComando.CommandText = "SELECT * FROM departamentos";
                miComando.Connection = miConexion;
                miLector = miComando.ExecuteReader();
                //ExecuteScalar devuelve la primera fila (cuando hacemos count se usa)
                //ExecuteNonQuery (update, delete, insert)
                //ExecuteReader (consultas)

                //Comprobar si el lector tiene filas, y en caso afirmativo recorrer
                if (miLector.HasRows)
                {
                    while (miLector.Read())
                    {
                        oDepartamento = new clsDepartamento();
                        oDepartamento.id = (int)miLector["IDDepartamento"];
                        oDepartamento.nombre = (string)miLector["Nombre_departamento"];
                        listaDepart.Add(oDepartamento);
                    }
                }
            }
            catch (SqlException exSql)
            {
                throw exSql;
            }
            finally
            {
                miLector.Close();
                gestConexion.closeConnection(ref miConexion);
            }


            return listaDepart;
        }

    }
}
