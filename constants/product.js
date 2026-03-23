export const CATEGORIES = [
  "Lốp xe", "Ắc quy", "Phanh", "Đèn chiếu sáng", "Nhớt & dầu",
  "Động cơ", "Lọc & làm sạch", "Điện xe", "Thân xe & ngoại thất",
  "Truyền động", "Hệ thống làm mát", "Khung & treo",
];

export const BRANDS = [
  "Honda", "Yamaha", "Suzuki", "Kawasaki", "Piaggio",
  "VinFast", "Michelin", "Bridgestone", "Motul", "Castrol",
  "NGK", "Bosch", "Denso", "Yuasa", "GS", "Panasonic", "Osram",
];

export const VEHICLE_TYPES = [
  "Xe số", "Xe ga", "Xe côn tay", "Xe điện", "Xe đạp điện", "Tất cả loại",
];

export const UNITS = ["Cái", "Bộ", "Lít", "Kg", "Mét", "Hộp", "Cuộn"];

export const INITIAL_FORM = {
  name: "", sku: "", barcode: "", brand: "", category: "",
  vehicleType: "", unit: "Cái", description: "",
  price: "", comparePrice: "", costPrice: "",
  stock: "", minStock: "", weight: "",
  length: "", width: "", height: "",
  warranty: "", origin: "",
};

export const DIMENSION_FIELDS = [
  { label: "Dài",  name: "length" },
  { label: "Rộng", name: "width"  },
  { label: "Cao",  name: "height" },
];