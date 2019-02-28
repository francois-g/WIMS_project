using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections;

namespace WimsApiMKI.Models
{
    public class WimsUser
    {
        private int _id;
        private string _firstname;
        private string _lastname;
        private string _email;
        private bool _isTwitcher;
        private bool _conditionAccepted;
        private Currency _currency;
        private byte _avatar;
        private bool _active;
        private string _pswd;
        private Role _role;

        #region GetSet

        public Role Role
        {
            get { return _role; }
            set { _role = value; }
        }

        public string Pswd
        {
            get { return _pswd; }
            set { _pswd = value; }
        }

        public bool Active
        {
            get { return _active; }
            set { _active = value; }
        }

        public byte Avatar
        {
            get { return _avatar; }
            set { _avatar = value; }
        }

        public Currency Currency
        {
            get { return _currency; }
            set { _currency = value; }
        }

        public bool ConditionAccepted
        {
            get { return _conditionAccepted; }
            set { _conditionAccepted = value; }
        }

        public bool IsTwitcher
        {
            get { return _isTwitcher; }
            set { _isTwitcher = value; }
        }

        public string Email
        {
            get { return _email; }
            set { _email = value; }
        }

        public string Lastname
        {
            get { return _lastname; }
            set { _lastname = value; }
        }

        public string Firstname
        {
            get { return _firstname; }
            set { _firstname = value; }
        }

        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }
        #endregion

    }
}
