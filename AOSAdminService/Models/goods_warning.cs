using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AOSAdminService.Models
{
    [Table("goods_warning")]
    public class goods_warning
    {
        public int id { get; set; }
        public int goods_id { get; set; }
        public int reason_id { get; set; }
        public int state_id { get; set; }
        public DateTime modify { get; set; }
    }
}
