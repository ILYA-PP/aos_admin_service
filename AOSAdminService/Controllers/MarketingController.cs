using Microsoft.AspNetCore.Mvc;
using AOSAdminService.Models;

namespace AOSAdminService.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MarketingController : Controller
    {
        private AuthDbContext _dbContext;

        public MarketingController(AuthDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        /// <summary>
        /// Получение списка акций
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/promoactions")]
        public IActionResult GetStickers()
        {
            var promo_actions = _dbContext.Promo_Actions;
            
            return Json(promo_actions);
        }
    }
}