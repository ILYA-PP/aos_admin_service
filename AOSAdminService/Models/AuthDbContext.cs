using Microsoft.EntityFrameworkCore;

namespace AOSAdminService.Models
{
    public class AuthDbContext : DbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Sticker> Stickers { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<goods> Goods { get; set; }
        public DbSet<price_fix> Prices_Fix { get; set; }
        public DbSet<promo_code> Promo_Codes { get; set; }
        public DbSet<goods_image> Goods_Images { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<v_price_goods> V_Price_Goods { get; set; }
        public DbSet<price> Prices { get; set; }
        public DbSet<group_goods> Group_Goods { get; set; }
        public DbSet<goods_warning> Goods_Warning { get; set; }
        public DbSet<goods_sticker> Goods_Stickers { get; set; }
        public DbSet<v_promo_actions_city_state_banner_type> Promo_Actions { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");
            modelBuilder.Entity<v_price_goods>(pg => 
            {
                pg.HasNoKey();
                pg.ToView("v_price_goods");
            });
            modelBuilder.Entity<v_promo_actions_city_state_banner_type>(pg =>
            {
                pg.HasNoKey();
                pg.ToView("v_promo_actions_city_state_banner_type");
            });
            base.OnModelCreating(modelBuilder);
        }
    }
}
