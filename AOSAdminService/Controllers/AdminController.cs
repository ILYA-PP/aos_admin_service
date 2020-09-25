using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AOSAdminService.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;

namespace AOSAdminService.Controllers
{
    [Route("[controller]")]
    //[EnableCors("AllowAllOrigin")]
    [ApiController]
    public class AdminController : Controller
    {
        private AuthDbContext _dbContext;

        public AdminController(AuthDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        /// <summary>
        /// Получение товара по ID
        /// </summary>
        /// <param name="id"></param>
        /// <response code="200">Товар получен</response>
        /// <response code="400">Товара не существует</response> 
        [HttpGet("/[controller]/goods")]
        public IActionResult GetGood([FromQuery]int id)
        {
            try
            {
                var good = _dbContext.Goods.Where(g => g.id == id).FirstOrDefault();
                var gg = _dbContext.Group_Goods.Where(g => g.goods_id == good.id).FirstOrDefault();

                if (gg == null)
                    good.markGroup = "Нет";
                else
                    good.markGroup = "Да";

                if (good == null)
                    return BadRequest(new { Messages = new[] { "Товара не существует!" } });

                return Json(good);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Messages = new[] { ex.Message } });
            }
        }

        /// <summary>
        /// Редактирование товара
        /// </summary>
        /// <param name="id"></param>
        /// <response code="200">Товар получен</response>
        /// <response code="400">Товара не существует</response> 
        [HttpGet("/[controller]/editgood")]
        public IActionResult EditGood([FromQuery]int id, string desc, string files)
        {
            try 
            { 
                var good = _dbContext.Goods.Where(g => g.id == id).FirstOrDefault();
                good.description = desc;

                //_dbContext.Goods.Update(good);
                _dbContext.SaveChanges();

                return Json("");
            }
            catch (Exception ex)
            {
                return BadRequest(new { Messages = new[] { ex.Message }});
            }
        }

        /// <summary>
        /// Получение списка стикеров
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/stickers")]
        public IActionResult GetStickers()
        {
            var stickers = _dbContext.Stickers;
            return Json(stickers);
        }

        /// <summary>
        /// Добавление стикера
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/addsticker")]
        public IActionResult AddSticker([FromQuery] int id, string name, string bg, string font)
        {
            var sticker = new Sticker() 
            { 
                id = id,
                name = name,
                background_color = "#" + bg,
                font_color = "#" + font,
                modify = DateTime.Now
            };

            _dbContext.Stickers.Add(sticker);
            _dbContext.SaveChanges();

            return Json("");
        }
        /// <summary>
        /// Редактирование стикера
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/editsticker")]
        public IActionResult EditSticker([FromQuery] int id, string name, string bg, string font, int old_id = 0)
        {
            var sticker = _dbContext.Stickers.Where(s => s.id == old_id).FirstOrDefault();
            if (old_id != 0)
            {
                _dbContext.Stickers.Remove(sticker);
                _dbContext.SaveChanges();
            }

            sticker.id = id;
            sticker.name = name;
            sticker.background_color = "#" + bg;
            sticker.font_color = "#" + font;
            sticker.modify = DateTime.Now;

            _dbContext.Stickers.Add(sticker);
            _dbContext.SaveChanges();

            return Json("");
        }
        /// <summary>
        /// Удаление стикера
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/deletesticker")]
        public IActionResult DeleteSticker([FromQuery] int id)
        {
            try
            {
                var sticker = _dbContext.Stickers.Where(s => s.id == id).FirstOrDefault();

                _dbContext.Stickers.Remove(sticker);
                _dbContext.SaveChanges();

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Получение списка промо-кодов
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/promocodes")]
        public IActionResult GetPromoCode()
        {
            var promoCodes = _dbContext.Promo_Codes;
            return Json(promoCodes);
        }

        /// <summary>
        /// Добавление промо-кода
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/addpromocode")]
        public IActionResult AddPromoCode([FromQuery] string code, DateTime dateStart, DateTime dateEnd, decimal discountPercent, decimal orderSum, int count, decimal maxDiscountSum, bool isFirst, int grounNumber, bool isAll)
        {
            var promoCode = new promo_code() 
            { 
                value = code,
                date_start = dateStart,
                date_end = dateEnd,
                discount_percent = discountPercent,
                order_sum = orderSum,
                person_count = count,
                discount_max = maxDiscountSum,
                is_order_first = isFirst,
                group_id = grounNumber,
                is_all_goods = isAll
            };

            _dbContext.Promo_Codes.Add(promoCode);
            _dbContext.SaveChanges();

            return Json("");
        }
        /// <summary>
        /// Редактирование промо-кода
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/editpromocode")]
        public IActionResult EditPromoCode([FromQuery] string code, DateTime dateStart, DateTime dateEnd, decimal discountPercent, decimal orderSum, int count, decimal maxDiscountSum, bool isFirst, int grounNumber, bool isAll, int old_id)
        {
            var promoCode = _dbContext.Promo_Codes.Where(pc => pc.id == old_id).FirstOrDefault();

            promoCode.value = code;
            promoCode.date_start = dateStart;
            promoCode.date_end = dateEnd;
            promoCode.discount_percent = discountPercent;
            promoCode.order_sum = orderSum;
            promoCode.person_count = count;
            promoCode.discount_max = maxDiscountSum;
            promoCode.is_order_first = isFirst;
            promoCode.group_id = grounNumber;
            promoCode.is_all_goods = isAll;

            _dbContext.Promo_Codes.Update(promoCode);
            _dbContext.SaveChanges();

            return Json("");
        }
        /// <summary>
        /// Удаление промо-кода
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/deletepromocode")]
        public IActionResult DeletePromoCode([FromQuery] int id)
        {
            var promoCode = _dbContext.Promo_Codes.Where(pc => pc.id == id).FirstOrDefault();

            _dbContext.Promo_Codes.Remove(promoCode);
            _dbContext.SaveChanges();

            return Json("");
        }

        /// <summary>
        /// Получение товаров без фото
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/goodsnoimage")]
        public IActionResult GetGoodsNoImage()
        {
            var goods_warning_gid = _dbContext.Goods_Warning
                                        .Where(gw => gw.reason_id == 2)
                                        .Select(gw => gw.goods_id);

            var goods = _dbContext.Goods.Where(g => goods_warning_gid.Contains(g.id));

            return Json(goods);
        }

        /// <summary>
        /// Получение товаров без описания
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/goodsnodesc")]
        public IActionResult GetGoodsNoDesc()
        {
            var goods_warning_gid = _dbContext.Goods_Warning
                                        .Where(gw => gw.reason_id == 1)
                                        .Select(gw => gw.goods_id);

            var goods = _dbContext.Goods.Where(g => goods_warning_gid.Contains(g.id));

            return Json(goods);
        }

        /// <summary>
        /// Получение цен
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/prices")]
        public IActionResult GetPrices()
        {
            var prices = _dbContext.V_Price_Goods;

            return Json(prices);
        }

        /// <summary>
        /// Удаление цены
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/deleteprice")]
        public IActionResult DeletePrice([FromQuery] int id)
        {
            var price = _dbContext.Prices.Where(p => p.id == id).FirstOrDefault();

            _dbContext.Prices.Remove(price);
            _dbContext.SaveChanges();

            return Json("");
        }
        /// <summary>
        /// Добавить стикер товарам
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/addgoodsticker")]
        public IActionResult AddGoodsSticker([FromQuery] string goods_id, int sticker_id)
        {
            var goods = goods_id.Split(',');
            foreach (var g_id in goods)
            {
                try
                {
                    var goodSticker = new goods_sticker()
                    {
                        goods_id = int.Parse(g_id),
                        sticker_id = sticker_id,
                        modify = DateTime.Now
                    };

                    _dbContext.Goods_Stickers.Add(goodSticker);
                    _dbContext.SaveChanges();
                }
                catch { continue; }
            }           

            return Json("");
        }
        /// <summary>
        /// Заменить стикер товарам
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/replacegoodsticker")]
        public IActionResult ReplaceGoodsSticker([FromQuery] string goods_id, int sticker_id)
        {
            var goods = goods_id.Split(',');
            foreach (var g_id in goods)
            {
                try
                {
                    var goodSticker = _dbContext.Goods_Stickers.Where(gs => gs.goods_id == int.Parse(g_id)).FirstOrDefault();
                    if (goodSticker == null)
                        continue;
                    goodSticker.sticker_id = sticker_id;

                    _dbContext.SaveChanges();
                }
                catch { continue; }
            }

            return Json("");
        }

        /// <summary>
        /// Удалить связи со стикерами у товаров
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/deletegoodsticker")]
        public IActionResult DeleteGoodsSticker([FromQuery] string goods_id)
        {
            var goods = goods_id.Split(',');
            foreach (var g_id in goods)
            {
                try
                {
                    var goodSticker = _dbContext.Goods_Stickers.Where(gs => gs.goods_id == int.Parse(g_id)).FirstOrDefault();
                    if (goodSticker == null)
                        continue;

                    _dbContext.Goods_Stickers.Remove(goodSticker);
                    _dbContext.SaveChanges();
                }
                catch { continue; }
            }

            return Json("");
        }

        /// <summary>
        /// Фильтрация списка цен по имени или коду товара
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/pricesfilter")]
        public IActionResult GetPricesFilter([FromQuery] int good_id, string name)
        {
            IQueryable<v_price_goods> prices = null;
            if(good_id != 0 && name != null)
                prices = _dbContext.V_Price_Goods.Where(p => p.good_id == good_id && p.name == name);
            else if (good_id != 0)
                prices = _dbContext.V_Price_Goods.Where(p => p.good_id == good_id);
            else if(name != null)
                prices = _dbContext.V_Price_Goods.Where(p => p.name == name);

            return Json(prices);
        }
        /// <summary>
        /// Фильтрация списка купонов по ид, коду и номеру группы товаров
        /// </summary>
        /// <response code="200"></response>
        /// <response code="400"></response> 
        [HttpGet("/[controller]/promocodefilter")]
        public IActionResult GetPromoCodeFilter([FromQuery] int id, string code, int group_id)
        {
            IQueryable<promo_code> promocodes = null;
            if (id != 0 && code != null && group_id != 0)
                promocodes = _dbContext.Promo_Codes.Where(p => p.id == id && p.value == code && p.group_id == group_id);
            else if (id != 0)
                promocodes = _dbContext.Promo_Codes.Where(p => p.id == id);
            else if (code != null)
                promocodes = _dbContext.Promo_Codes.Where(p => p.value == code);
            else if (group_id != 0)
                promocodes = _dbContext.Promo_Codes.Where(p => p.group_id == group_id);

            return Json(promocodes);
        }
    }
}