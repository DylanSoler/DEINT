using System;
using System.Collections.Generic;
using System.Linq;


namespace _13_DataBinding.Models.Entidades
{
    public class clsDepartamento
    {
        #region Constructor por defecto
        public clsDepartamento()
        {

        }
        #endregion

        #region Constructor por parametros
        public clsDepartamento(int id, String nombre)
        {
            this.id = id;
            this.nombre = nombre;
        }
        #endregion

        #region propiedades y atributos
        public int id { get; set; }
        public String nombre { get; set; }
        #endregion
    }
}