using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WimsApiMKI.Models
{
    public class Currency
    {
        private int _id;
        private string _currencyName;
        private string _currencyShortcut;
        private decimal _conversionRate;

        public Currency()
        {
            this.Id = 1;
        }

        #region GetSet
        public decimal ConversionRate
        {
            get { return _conversionRate; }
            set { _conversionRate = value; }
        }

        public string CurrencyShortCut
        {
            get { return _currencyShortcut; }
            set { _currencyShortcut = value; }
        }

        public string CurrencyName
        {
            get { return _currencyName; }
            set { _currencyName = value; }
        }

        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }
        #endregion
    }
}
