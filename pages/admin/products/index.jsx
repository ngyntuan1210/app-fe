"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputBase from "@mui/material/InputBase";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import {
  FiChevronRight, FiSearch, FiEdit2, FiTrash2,
  FiPlus, FiChevronLeft, FiFilter,
} from "react-icons/fi";
import AdminLayout from "@/layouts/AdminLayout";

// ── Mock data ──────────────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  { id: 1,  image: "🔧", name: "Lốp xe Michelin Pilot Street 2",      sku: "LX-MC-001", category: "Lốp xe",               price: 850000,  stock: 42,  status: "Còn hàng",  brand: "Michelin"  },
  { id: 2,  image: "⚡", name: "Bình ắc quy xe điện GS 12V-20Ah",    sku: "AQ-GS-002", category: "Ắc quy",               price: 1250000, stock: 18,  status: "Còn hàng",  brand: "GS"        },
  { id: 3,  image: "🛞", name: "Phanh đĩa Wave Alpha 110cc",          sku: "PD-WA-003", category: "Phanh",                price: 320000,  stock: 0,   status: "Hết hàng",  brand: "Honda"     },
  { id: 4,  image: "💡", name: "Đèn LED headlight xe máy 35W",        sku: "DL-LE-004", category: "Đèn chiếu sáng",       price: 185000,  stock: 76,  status: "Còn hàng",  brand: "Osram"     },
  { id: 5,  image: "🔩", name: "Nhớt Motul 3000 4T 20W-50 1L",       sku: "NT-MO-005", category: "Nhớt & dầu",           price: 145000,  stock: 120, status: "Còn hàng",  brand: "Motul"     },
  { id: 6,  image: "⚙️", name: "Bộ côn xe SH 150i 2023",             sku: "BC-SH-006", category: "Động cơ",              price: 2100000, stock: 5,   status: "Sắp hết",   brand: "Honda"     },
  { id: 7,  image: "🔋", name: "Pin lithium xe đạp điện 48V-15Ah",   sku: "PN-LI-007", category: "Ắc quy",               price: 3850000, stock: 12,  status: "Còn hàng",  brand: "Panasonic" },
  { id: 8,  image: "🛠️", name: "Bộ lọc gió Yamaha Exciter 155",      sku: "LG-YM-008", category: "Lọc & làm sạch",      price: 95000,   stock: 0,   status: "Hết hàng",  brand: "Yamaha"    },
  { id: 9,  image: "🔦", name: "Còi điện 12V xe máy Denso",           sku: "CO-DN-009", category: "Điện xe",              price: 78000,   stock: 88,  status: "Còn hàng",  brand: "Denso"     },
  { id: 10, image: "🏍️", name: "Yên xe Honda Vision 2022",            sku: "YX-HV-010", category: "Thân xe & ngoại thất", price: 750000,  stock: 9,   status: "Sắp hết",   brand: "Honda"     },
  { id: 11, image: "⚡", name: "Bộ sạc xe điện thông minh 60V-5A",   sku: "SC-EV-011", category: "Ắc quy",               price: 420000,  stock: 33,  status: "Còn hàng",  brand: "Bosch"     },
  { id: 12, image: "🔧", name: "Bugi NGK Iridium CR8EIX",             sku: "BG-NK-012", category: "Động cơ",              price: 165000,  stock: 64,  status: "Còn hàng",  brand: "NGK"       },
  { id: 13, image: "🛞", name: "Vành bánh trước Exciter 150",         sku: "VB-EX-013", category: "Thân xe & ngoại thất", price: 580000,  stock: 0,   status: "Hết hàng",  brand: "Yamaha"    },
  { id: 14, image: "💡", name: "Đèn xi nhan LED SH Mode 125",         sku: "XN-SH-014", category: "Đèn chiếu sáng",       price: 125000,  stock: 47,  status: "Còn hàng",  brand: "Honda"     },
  { id: 15, image: "⚙️", name: "Xích xe máy Honda Wave RSX",          sku: "XC-WR-015", category: "Truyền động",          price: 210000,  stock: 55,  status: "Còn hàng",  brand: "Honda"     },
  { id: 16, image: "🔩", name: "Nhớt Castrol Power 1 4T 10W-40",     sku: "NT-CA-016", category: "Nhớt & dầu",           price: 138000,  stock: 200, status: "Còn hàng",  brand: "Castrol"   },
  { id: 17, image: "🔋", name: "Ắc quy Yuasa YTX7A-BS 12V",          sku: "AQ-YU-017", category: "Ắc quy",               price: 680000,  stock: 22,  status: "Còn hàng",  brand: "Yuasa"     },
  { id: 18, image: "🏍️", name: "Kính chắn gió xe máy universal",     sku: "KC-UN-018", category: "Thân xe & ngoại thất", price: 290000,  stock: 3,   status: "Sắp hết",   brand: "Generic"   },
];

const CATEGORIES = ["Tất cả", ...Array.from(new Set(ALL_PRODUCTS.map((p) => p.category)))];
const PAGE_SIZE_OPTIONS = [5, 10, 20];

// ── Helpers ───────────────────────────────────────────────────────────────
const statusCfg = {
  "Còn hàng": { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  "Sắp hết":  { color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  "Hết hàng": { color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
};

const StatusBadge = ({ status }) => {
  const cfg = statusCfg[status] ?? { color: "#6b7280", bg: "#f9fafb", border: "#e5e7eb" };
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", px: 1.5, py: 0.35, borderRadius: "6px", border: `1px solid ${cfg.border}`, bgcolor: cfg.bg, color: cfg.color, fontSize: "0.76rem", fontWeight: 500, whiteSpace: "nowrap" }}>
      {status}
    </Box>
  );
};

const fmtVND = (n) => n.toLocaleString("vi-VN") + "₫";

// ── Pagination helpers ────────────────────────────────────────────────────
const PageBtn = ({ label, active, disabled, onClick, icon }) => (
  <IconButton
    size="small"
    disabled={disabled}
    onClick={onClick}
    sx={{
      border: active ? "1px solid #6366f1" : "1px solid #e2e8f0",
      borderRadius: "7px",
      minWidth: 32,
      height: 32,
      px: 0.5,
      bgcolor: active ? "#6366f1" : "transparent",
      color: active ? "#fff" : "#374151",
      fontWeight: active ? 700 : 400,
      fontSize: "0.82rem",
      "&:disabled": { opacity: 0.35 },
      "&:hover:not(:disabled)": { bgcolor: active ? "#5254cc" : "#f8fafc" },
    }}
  >
    {icon ?? label}
  </IconButton>
);

// ── Page component ────────────────────────────────────────────────────────
export default function ProductsPage() {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [page,     setPage]     = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL_PRODUCTS.filter((p) => {
      const matchCat = category === "Tất cả" || p.category === category;
      const matchQ   = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage   = Math.min(page, totalPages);
  const paginated  = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const go = (p) => setPage(Math.max(1, Math.min(totalPages, p)));

  // Page number window (max 5 buttons)
  const pageNums = useMemo(() => {
    const delta = 2, range = [];
    for (let i = Math.max(1, safePage - delta); i <= Math.min(totalPages, safePage + delta); i++) range.push(i);
    return range;
  }, [safePage, totalPages]);

  return (
    <Box>
      {/* ── Header ── */}
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 3, gap: 2, flexWrap: "wrap" }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: "1.25rem", color: "#111827", lineHeight: 1.3 }}>
            Danh sách sản phẩm
          </Typography>
          <Typography sx={{ fontSize: "0.8rem", color: "#9ca3af", mt: 0.25 }}>
            Phụ tùng xe máy &amp; xe điện
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Breadcrumb */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 0.5 }}>
            <Typography component={Link} href="/admin" sx={{ fontSize: "0.82rem", color: "#6b7280", textDecoration: "none", "&:hover": { color: "#3641f5" } }}>
              Home
            </Typography>
            <FiChevronRight size={13} color="#9ca3af" />
            <Typography sx={{ fontSize: "0.82rem", color: "#111827", fontWeight: 500 }}>Sản phẩm</Typography>
          </Box>

          <Button
            component={Link}
            href="/admin/products/create"
            variant="contained"
            startIcon={<FiPlus size={15} />}
            sx={{ bgcolor: "#3641f5", borderRadius: "8px", textTransform: "none", fontWeight: 600, fontSize: "0.85rem", px: 2, py: 0.9, boxShadow: "0 2px 8px rgba(54,65,245,0.25)", "&:hover": { bgcolor: "#2d36d4" } }}
          >
            Thêm sản phẩm
          </Button>
        </Box>
      </Box>

      {/* ── Card ── */}
      <Box sx={{ bgcolor: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden" }}>

        {/* Toolbar */}
        <Box sx={{ px: 3, py: 2, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", borderBottom: "1px solid #f1f5f9" }}>
          <Typography sx={{ fontWeight: 600, fontSize: "0.95rem", color: "#111827", mr: "auto" }}>
            Tất cả sản phẩm{" "}
            <Box component="span" sx={{ fontSize: "0.78rem", fontWeight: 400, color: "#9ca3af" }}>
              ({filtered.length})
            </Box>
          </Typography>

          {/* Category filter */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, border: "1px solid #e2e8f0", borderRadius: "8px", px: 1.25, py: 0.45, bgcolor: "#fafafa" }}>
            <FiFilter size={14} color="#9ca3af" />
            <Select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(1); }}
              variant="standard"
              disableUnderline
              sx={{ fontSize: "0.82rem", color: "#374151", minWidth: 130, "& .MuiSelect-select": { py: 0 } }}
            >
              {CATEGORIES.map((c) => (
                <MenuItem key={c} value={c} sx={{ fontSize: "0.82rem" }}>{c}</MenuItem>
              ))}
            </Select>
          </Box>

          {/* Search */}
          <Box sx={{ display: "flex", alignItems: "center", border: "1px solid #e2e8f0", borderRadius: "8px", px: 1.5, py: 0.55, gap: 1, width: { xs: "100%", sm: 230 }, bgcolor: "#fff", "&:focus-within": { borderColor: "#6366f1", boxShadow: "0 0 0 3px rgba(99,102,241,0.08)" }, transition: "all 0.15s" }}>
            <FiSearch size={14} color="#9ca3af" />
            <InputBase
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Tìm tên, SKU, hãng..."
              sx={{ fontSize: "0.82rem", color: "#374151", width: "100%", "& input::placeholder": { color: "#9ca3af" } }}
            />
          </Box>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ "& th": { bgcolor: "#fafafa", borderBottom: "1px solid #f1f5f9", py: 1.2, color: "#6b7280", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" } }}>
                <TableCell sx={{ pl: 3, width: 48 }}>#</TableCell>
                <TableCell sx={{ minWidth: 220 }}>Sản phẩm</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell>Đơn giá</TableCell>
                <TableCell align="center">Tồn kho</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 8, color: "#9ca3af", fontSize: "0.875rem" }}>
                    Không tìm thấy sản phẩm nào phù hợp
                  </TableCell>
                </TableRow>
              ) : paginated.map((row, idx) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "& td": { borderBottom: "1px solid #f8fafc", py: 1.5, fontSize: "0.875rem", color: "#374151" },
                    "&:last-child td": { borderBottom: "none" },
                    "&:hover": { bgcolor: "#fafafa" },
                    transition: "background 0.1s",
                  }}
                >
                  {/* Row index */}
                  <TableCell sx={{ pl: 3, color: "#c4c9d4", fontSize: "0.8rem", fontWeight: 500 }}>
                    {(safePage - 1) * pageSize + idx + 1}
                  </TableCell>

                  {/* Product */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: "8px", bgcolor: "#f1f5f9", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                        {row.image}
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", color: "#111827", lineHeight: 1.35 }}>
                          {row.name}
                        </Typography>
                        <Typography sx={{ fontSize: "0.75rem", color: "#9ca3af", lineHeight: 1.3 }}>
                          {row.brand}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* SKU */}
                  <TableCell>
                    <Box component="span" sx={{ fontFamily: "monospace", fontSize: "0.75rem", bgcolor: "#f8fafc", border: "1px solid #e5e7eb", px: 0.9, py: 0.3, borderRadius: "5px", color: "#6b7280" }}>
                      {row.sku}
                    </Box>
                  </TableCell>

                  {/* Category */}
                  <TableCell sx={{ color: "#6b7280", fontSize: "0.82rem" }}>{row.category}</TableCell>

                  {/* Price */}
                  <TableCell sx={{ fontWeight: 600, color: "#111827", whiteSpace: "nowrap" }}>
                    {fmtVND(row.price)}
                  </TableCell>

                  {/* Stock */}
                  <TableCell align="center">
                    <Box sx={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      minWidth: 36, height: 24, borderRadius: "6px", px: 1,
                      bgcolor: row.stock === 0 ? "#fef2f2" : row.stock < 10 ? "#fffbeb" : "#f0fdf4",
                      color:   row.stock === 0 ? "#dc2626" : row.stock < 10 ? "#d97706" : "#16a34a",
                      fontSize: "0.8rem", fontWeight: 600,
                    }}>
                      {row.stock}
                    </Box>
                  </TableCell>

                  {/* Status */}
                  <TableCell><StatusBadge status={row.status} /></TableCell>

                  {/* Actions */}
                  <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                      <Tooltip title="Chỉnh sửa" arrow>
                        <IconButton size="small" component={Link} href={`/admin/products/${row.id}/edit`}
                          sx={{ color: "#6366f1", borderRadius: "6px", p: 0.6, "&:hover": { bgcolor: "#eef2ff" } }}>
                          <FiEdit2 size={14} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa" arrow>
                        <IconButton size="small"
                          sx={{ color: "#ef4444", borderRadius: "6px", p: 0.6, "&:hover": { bgcolor: "#fef2f2" } }}>
                          <FiTrash2 size={14} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ── Pagination footer ── */}
        <Box sx={{ px: 3, py: 1.75, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1.5, borderTop: "1px solid #f1f5f9" }}>
          {/* Left: rows per page */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "0.8rem", color: "#6b7280" }}>Hiển thị</Typography>
            <Select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              size="small"
              sx={{ fontSize: "0.8rem", height: 30, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e2e8f0", borderRadius: "7px" } }}
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <MenuItem key={n} value={n} sx={{ fontSize: "0.82rem" }}>{n}</MenuItem>
              ))}
            </Select>
            <Typography sx={{ fontSize: "0.8rem", color: "#9ca3af" }}>
              hàng &nbsp;·&nbsp; Trang {safePage}/{totalPages}
            </Typography>
          </Box>

          {/* Right: page buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PageBtn icon={<FiChevronLeft size={15} />} disabled={safePage === 1} onClick={() => go(safePage - 1)} />

            {pageNums[0] > 1 && (
              <>
                <PageBtn label={1} onClick={() => go(1)} />
                {pageNums[0] > 2 && <Typography sx={{ px: 0.5, color: "#9ca3af", fontSize: "0.85rem" }}>…</Typography>}
              </>
            )}

            {pageNums.map((p) => (
              <PageBtn key={p} label={p} active={p === safePage} onClick={() => go(p)} />
            ))}

            {pageNums[pageNums.length - 1] < totalPages && (
              <>
                {pageNums[pageNums.length - 1] < totalPages - 1 && <Typography sx={{ px: 0.5, color: "#9ca3af", fontSize: "0.85rem" }}>…</Typography>}
                <PageBtn label={totalPages} onClick={() => go(totalPages)} />
              </>
            )}

            <PageBtn icon={<FiChevronRight size={15} />} disabled={safePage === totalPages} onClick={() => go(safePage + 1)} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

ProductsPage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
