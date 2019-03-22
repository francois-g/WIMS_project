using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class TokenModel
    {
        private string pseudo;
        private string password;

        public string Pseudo
        {
            get { return pseudo; }
            set { pseudo = value; }
        }

        public string Password
        {
            get { return password; }
            set { password = value; }
        }

    }
}
