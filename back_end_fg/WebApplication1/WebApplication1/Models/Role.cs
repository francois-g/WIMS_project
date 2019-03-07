using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WimsApiMKI.Models
{
    public class Role
    {
        private int _id;
        private string _roleName;

        public Role(int value)
        {
            this.Id = value;
        }

        #region GetSet
        public string RoleName
        {
            get { return _roleName; }
            set { _roleName = value; }
        }

        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }
        #endregion

    }
}
