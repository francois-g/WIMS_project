using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class UserCheckModel
    {
        private string pseudo;
        private string email;

        public string Pseudo
        {
            get { return pseudo; }
            set { pseudo = value; }
        }

        public string Email
        {
            get { return email; }
            set { email = value; }
        }

    }
}
