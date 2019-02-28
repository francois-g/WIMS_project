using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WimsApiMKI.Models
{
    public class Game
    {
        private int _id;
        private string _gameName;
        private string _gameImage;
        private bool _active;

        #region GetSet
        public int Id
        {
            get { return _id; }
            set { _id = value; }
        }

        public string GameName
        {
            get { return _gameName; }
            set { _gameName = value; }
        }

        public string GameImage
        {
            get { return _gameImage; }
            set { _gameImage = value; }
        }

        public bool Active
        {
            get { return _active; }
            set { _active = value; }
        }
        #endregion
    }
}
