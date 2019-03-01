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
        private string _pseudo;
        private string _pswd;
        private string _email;
        private string _twitchLink;
        private string _pseudoTwitch;
        private bool _conditionAccepted;
        private int? _currencyId;
        private Currency _currency;
        private string _avatar;
        private bool _active;
        private Role _role;

        public WimsUser()
        {
            Currency = new Currency();
            Role = new Role();
        }

        #region GetSet
        
        public string Firstname
        {
            get { return _firstname; }
            set { _firstname = value; }
        }

        public string Lastname
        {
            get { return _lastname; }
            set { _lastname = value; }
        }
        
        public string Pseudo
        {
            get { return _pseudo; }
            set { _pseudo = value; }
        }

        public string Pswd
        {
            get { return _pswd; }
            set { _pswd = value; }
        }

        public string Email
        {
            get { return _email; }
            set { _email = value; }
        }

        public string TwitchLink
        {
            get { return _twitchLink; }
            set { _twitchLink = value; }
        }

        public string PseudoTwitch
        {
            get { return _pseudoTwitch; }
            set { _pseudoTwitch = value; }
        }

        public bool ConditionAccepted
        {
            get { return _conditionAccepted; }
            set { _conditionAccepted = value; }
        }

        public int? CurrencyId
        {
            get { return _currencyId; }
            set { _currencyId = value; }
        }

        public Currency Currency
        {
            get { return _currency; }
            set { _currency = value; }
        }

        public string Avatar
        {
            get { return _avatar; }
            set { _avatar = value; }
        }

        public bool Active
        {
            get { return _active; }
            set { _active = value; }
        }

        public Role Role
        {
            get { return _role; }
            set { _role = value; }
        }



        



        


        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }
        #endregion

    }
}
