﻿#pragma checksum "C:\Users\dasoler\source\repos\07-Grid-Formulario\07-Grid-Formulario\Views\MainPage.xaml" "{406ea660-64cf-4c82-b6f0-42d48172a799}" "442271F162B9F0F5030BB350328803FD"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace _07_Grid_Formulario
{
    partial class MainPage : 
        global::Windows.UI.Xaml.Controls.Page, 
        global::Windows.UI.Xaml.Markup.IComponentConnector,
        global::Windows.UI.Xaml.Markup.IComponentConnector2
    {
        /// <summary>
        /// Connect()
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Windows.UI.Xaml.Build.Tasks"," 10.0.17.0")]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        public void Connect(int connectionId, object target)
        {
            switch(connectionId)
            {
            case 2: // Views\MainPage.xaml line 13
                {
                    this.stkBotones = (global::Windows.UI.Xaml.Controls.StackPanel)(target);
                }
                break;
            case 3: // Views\MainPage.xaml line 19
                {
                    this.grdFormulario = (global::Windows.UI.Xaml.Controls.Grid)(target);
                }
                break;
            case 4: // Views\MainPage.xaml line 33
                {
                    this.txtNombre = (global::Windows.UI.Xaml.Controls.TextBox)(target);
                }
                break;
            case 5: // Views\MainPage.xaml line 34
                {
                    this.txtBlErrorNombre = (global::Windows.UI.Xaml.Controls.TextBlock)(target);
                }
                break;
            case 6: // Views\MainPage.xaml line 37
                {
                    this.txtApellidos = (global::Windows.UI.Xaml.Controls.TextBox)(target);
                }
                break;
            case 7: // Views\MainPage.xaml line 38
                {
                    this.txtBlErrorApellidos = (global::Windows.UI.Xaml.Controls.TextBlock)(target);
                }
                break;
            case 8: // Views\MainPage.xaml line 41
                {
                    this.txtEdad = (global::Windows.UI.Xaml.Controls.TextBox)(target);
                }
                break;
            case 9: // Views\MainPage.xaml line 42
                {
                    this.txtBlErrorEdad = (global::Windows.UI.Xaml.Controls.TextBlock)(target);
                }
                break;
            case 10: // Views\MainPage.xaml line 15
                {
                    this.Guardar = (global::Windows.UI.Xaml.Controls.AppBarButton)(target);
                    ((global::Windows.UI.Xaml.Controls.AppBarButton)this.Guardar).Click += this.Guardar_Click;
                }
                break;
            default:
                break;
            }
            this._contentLoaded = true;
        }

        /// <summary>
        /// GetBindingConnector(int connectionId, object target)
        /// </summary>
        [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.Windows.UI.Xaml.Build.Tasks"," 10.0.17.0")]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        public global::Windows.UI.Xaml.Markup.IComponentConnector GetBindingConnector(int connectionId, object target)
        {
            global::Windows.UI.Xaml.Markup.IComponentConnector returnValue = null;
            return returnValue;
        }
    }
}

