using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AOSAdminService.Models
{
    public partial class v_promo_actions_city_state_banner_type
    {
        public int id { get; set; }
        public string banner { get; set; }
        public string title { get; set; }
        public DateTime date_start { get; set; }
        public DateTime date_end { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public DateTime modify { get; set; }
    }
}
