namespace AOSAdminService.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("promo_code")]
    public partial class promo_code
    {
        [Key]
        public int id { get; set; }

        [StringLength(50)]
        public string value { get; set; }

        [Column(TypeName = "date")]
        public DateTime? date_start { get; set; }

        [Column(TypeName = "date")]
        public DateTime? date_end { get; set; }

        public decimal? discount_percent { get; set; }

        public decimal? order_sum { get; set; }

        public int? person_count { get; set; }

        public decimal? discount_max { get; set; }

        public bool? is_order_first { get; set; }

        public bool? is_all_goods { get; set; }

        public int? group_id { get; set; }

        public int? type_id { get; set; }
    }
}
