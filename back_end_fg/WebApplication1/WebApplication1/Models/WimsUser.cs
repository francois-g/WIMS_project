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
        private string _firstName;
        private string _lastName;
        private string _pseudo;
        private string _pswd;
        private string _email;
        private string _twitchLink;
        private string _pseudoTwitch;
        private int _balance;
        private bool _conditionAccepted;
        private int? _currencyId;
        private Currency _currency;
        private string _avatar;
        private bool _active;
        private int _roleId;
        //private Role _role;


        public WimsUser()
        {
            Currency = new Currency();
            //RoleId = 1;
        }

        #region GetSet
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string FirstName
        {
            get { return _firstName; }
            set { _firstName = value; }
        }

        public string LastName
        {
            get { return _lastName; }
            set { _lastName = value; }
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

        public int Balance
        {
            get { return _balance; }
            set { _balance = value; }
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

        public int RoleId
        {
            get { return _roleId; }
            set { _roleId = value; }
        }
        #endregion

    }
}
