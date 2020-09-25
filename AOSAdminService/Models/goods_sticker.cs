using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AOSAdminService.Models
{
    [Table("goods_sticker")]
    public partial class goods_sticker
    {
        [Key]
        public int id { get; set; }
        public int goods_id { get; set; }
        public int sticker_id { get; set; }
        public DateTime modify { get; set; }
    }
}
