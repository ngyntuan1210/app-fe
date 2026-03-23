// components/ImageUpload.jsx
import { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { FiUploadCloud, FiX, FiPlus } from "react-icons/fi";

const MAX_IMAGES = 6;

export default function ImageUpload({ images, onChange }) {
  const inputRef = useRef(null);

  const openPicker = () => inputRef.current?.click();

  const addFiles = (files) => {
    const next = Array.from(files).map((f) => ({
      url:  URL.createObjectURL(f),
      name: f.name,
    }));
    onChange((prev) => [...prev, ...next].slice(0, MAX_IMAGES));
  };

  const handleDrop  = (e) => { e.preventDefault(); addFiles(e.dataTransfer.files); };
  const handleInput = (e) => addFiles(e.target.files);
  const handleRemove = (idx) => onChange((prev) => prev.filter((_, i) => i !== idx));

  return (
    <Box>
      {/* ── Drop zone ── */}
      <Box
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={openPicker}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && openPicker()}
        sx={{
          border: "2px dashed #cbd5e1",
          borderRadius: "10px",
          p: { xs: 3, sm: 4 },
          minHeight: 140,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          cursor: "pointer",
          bgcolor: "#fafafa",
          transition: "border-color 0.15s, background 0.15s",
          "&:hover": { borderColor: "#6366f1", bgcolor: "#eef2ff" },
        }}
      >
        <FiUploadCloud size={36} color="#94a3b8" />
        <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", color: "#374151" }}>
          Kéo thả ảnh vào đây
        </Typography>
        <Typography sx={{ fontSize: "0.78rem", color: "#9ca3af" }}>
          hoặc{" "}
          <Box component="span" sx={{ color: "#6366f1", fontWeight: 600 }}>chọn file</Box>
          {" "}· PNG, JPG, WEBP · Tối đa {MAX_IMAGES} ảnh
        </Typography>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleInput}
        />
      </Box>

      {/* ── Preview grid ── */}
      {images.length > 0 && (
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(3, 1fr)",
              sm: "repeat(4, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 1.5,
          }}
        >
          {images.map((img, idx) => (
            <Box
              key={idx}
              sx={{
                position: "relative",
                aspectRatio: "1",
                borderRadius: "8px",
                overflow: "hidden",
                border: idx === 0 ? "2px solid #6366f1" : "1px solid #e2e8f0",
              }}
            >
              <Box
                component="img"
                src={img.url}
                alt={img.name}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              {/* Primary badge */}
              {idx === 0 && (
                <Box sx={{
                  position: "absolute", top: 4, left: 4,
                  bgcolor: "#6366f1", color: "#fff",
                  fontSize: "0.6rem", fontWeight: 700,
                  px: 0.75, py: 0.25, borderRadius: "4px",
                }}>
                  Chính
                </Box>
              )}

              {/* Remove button */}
              <IconButton
                size="small"
                onClick={(e) => { e.stopPropagation(); handleRemove(idx); }}
                sx={{
                  position: "absolute", top: 3, right: 3,
                  bgcolor: "rgba(0,0,0,0.55)", color: "#fff", p: 0.3,
                  "&:hover": { bgcolor: "rgba(220,38,38,0.85)" },
                }}
              >
                <FiX size={12} />
              </IconButton>
            </Box>
          ))}

          {/* Add more slot */}
          {images.length < MAX_IMAGES && (
            <Box
              onClick={openPicker}
              role="button"
              tabIndex={0}
              sx={{
                aspectRatio: "1",
                borderRadius: "8px",
                border: "2px dashed #cbd5e1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#94a3b8",
                transition: "all 0.15s",
                "&:hover": { borderColor: "#6366f1", color: "#6366f1", bgcolor: "#eef2ff" },
              }}
            >
              <FiPlus size={20} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}