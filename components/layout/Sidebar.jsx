"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { FiBarChart2, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { MENU_SECTIONS } from "../../section/menu_section";
import styles from "../../styles/admin/sidebar.module.css";

// ── Width constants ────────────────────────────────────────────────────────
const DRAWER_EXPANDED  = 260;
const DRAWER_COLLAPSED = 72;

// ── Helper: join class names (filter falsy) ────────────────────────────────
const cx = (...classes) => classes.filter(Boolean).join(" ");

// ─────────────────────────────────────────────────────────────────────────────
// Logo
// ─────────────────────────────────────────────────────────────────────────────
function Logo({ collapsed }) {
  return (
    <Box className={cx(styles.logoWrap, collapsed && styles.logoWrapCollapsed)}>
      <Box className={styles.logoIcon}>
        <FiBarChart2 color="#fff" size={18} />
      </Box>
      {!collapsed && (
        <Typography className={styles.logoText} variant="h6">
          Admin
        </Typography>
      )}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section label
// ─────────────────────────────────────────────────────────────────────────────
function SectionLabel({ label, collapsed }) {
  if (collapsed) return <Box className={styles.sectionDivider} />;
  return (
    <Typography variant="overline" className={styles.sectionLabel}>
      {label}
    </Typography>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Nav item (leaf — no children)
// ─────────────────────────────────────────────────────────────────────────────
function NavItem({ item, collapsed, pathname }) {
  const isActive = pathname === item.href;

  return (
    <ListItem disablePadding className={styles.navItemOuter}>
      <ListItemButton
        component={Link}
        href={item.href}
        className={cx(
          styles.navItemBtn,
          collapsed && styles.navItemBtnCollapsed,
          isActive ? styles.navItemBtnActive : styles.navItemBtnDefault,
        )}
        sx={{ color: isActive ? "var(--active-color)" : "var(--text-default)" }}
      >
        <ListItemIcon
          className={cx(
            styles.navIcon,
            isActive  && styles.navIconActive,
            collapsed && styles.navIconCollapsed,
          )}
        >
          {item.icon}
        </ListItemIcon>

        {!collapsed && (
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize:   "0.875rem",
              fontWeight: isActive ? 600 : 500,
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Nav group (with children)
// ─────────────────────────────────────────────────────────────────────────────
function NavGroup({ item, collapsed, pathname, expanded, onToggle }) {
  const isOpen        = expanded.includes(item.label);
  const isGroupActive = item.children?.some((c) => pathname === c.href);

  return (
    <Box className={styles.navGroupOuter}>
      {/* Group header button */}
      <ListItem disablePadding className={styles.navItemOuter}>
        <ListItemButton
          onClick={() => onToggle(item.label)}
          className={cx(
            styles.navGroupBtn,
            collapsed                  && styles.navGroupBtnCollapsed,
            isGroupActive              && styles.navGroupBtnGroupActive,
            isGroupActive && !isOpen   && styles.navGroupBtnActiveCollapsed,
          )}
          sx={{ color: isGroupActive ? "var(--active-color)" : "var(--text-default)" }}
        >
          <ListItemIcon
            className={cx(
              styles.navIcon,
              isGroupActive && styles.navIconActive,
              collapsed     && styles.navIconCollapsed,
            )}
          >
            {item.icon}
          </ListItemIcon>

          {!collapsed && (
            <>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize:   "0.875rem",
                  fontWeight: isGroupActive ? 600 : 500,
                }}
              />
              <Box className={styles.chevronIcon}>
                {isOpen ? <FiChevronDown /> : <FiChevronRight />}
              </Box>
            </>
          )}
        </ListItemButton>
      </ListItem>

      {/* Sub-items */}
      <Collapse in={isOpen && !collapsed} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children.map((sub) => {
            const isSubActive = pathname === sub.href;
            return (
              <ListItem
                key={sub.href}
                disablePadding
                className={cx(
                  styles.subItemOuter,
                  !collapsed && styles.subItemOuterIndented,
                )}
              >
                <ListItemButton
                  component={Link}
                  href={sub.href}
                  className={cx(
                    styles.subItemBtn,
                    isSubActive ? styles.subItemBtnActive : styles.subItemBtnDefault,
                  )}
                  sx={{ color: isSubActive ? "var(--active-color)" : "var(--text-default)" }}
                >
                  <ListItemText
                    primary={sub.label}
                    primaryTypographyProps={{
                      fontSize:   "0.85rem",
                      fontWeight: isSubActive ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Sidebar
// ─────────────────────────────────────────────────────────────────────────────
export default function Sidebar({ mobileOpen, onClose, collapsed }) {
  const pathname    = usePathname();
  const drawerWidth = collapsed ? DRAWER_COLLAPSED : DRAWER_EXPANDED;

  // Auto-expand the group whose child is active
  const defaultExpanded = MENU_SECTIONS
    .flatMap((s) => s.items)
    .filter((item) => item.children?.some((c) => pathname === c.href))
    .map((item) => item.label);

  const [expanded, setExpanded] = useState(
    defaultExpanded.length ? defaultExpanded : ["Dashboard"],
  );

  const toggleExpand = (label) =>
    setExpanded((prev) =>
      prev.includes(label)
        ? prev.filter((i) => i !== label)
        : [...prev, label],
    );

  // ── Shared drawer content ──────────────────────────────────────────────────
  const content = (
    <Box className={styles.drawerPaper} sx={{ width: drawerWidth }}>
      {/* Logo */}
      <Box className={styles.logoRow}>
        <Logo collapsed={collapsed} />
      </Box>

      <Divider sx={{ borderColor: "var(--border-color)", flexShrink: 0 }} />

      {/* Navigation */}
      <Box className={styles.navBox}>
        {MENU_SECTIONS.map((section) => (
          <Box key={section.section}>
            <SectionLabel label={section.section} collapsed={collapsed} />
            <List disablePadding>
              {section.items.map((item) =>
                item.children ? (
                  <NavGroup
                    key={item.label}
                    item={item}
                    collapsed={collapsed}
                    pathname={pathname}
                    expanded={expanded}
                    onToggle={toggleExpand}
                  />
                ) : (
                  <NavItem
                    key={item.href}
                    item={item}
                    collapsed={collapsed}
                    pathname={pathname}
                  />
                ),
              )}
            </List>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Divider sx={{ borderColor: "var(--border-color)", flexShrink: 0 }} />
      <Typography className={styles.footer}>
        {collapsed ? "v1.0" : "Version 1.0.0"}
      </Typography>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width:      { md: drawerWidth },
        flexShrink: { md: 0 },
        transition: "width 0.25s ease",
      }}
      aria-label="admin sidebar"
    >
      {/* ── Mobile: temporary overlay ── */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width:  260,
            border: "none",
            boxShadow: "4px 0 24px rgba(0,0,0,0.08)",
          },
        }}
      >
        {content} 
      </Drawer>

      {/* ── Tablet + Desktop: permanent ── */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width:      drawerWidth,
            top:        0,
            border:     "none",
            transition: "width 0.25s ease",
            overflow:   "hidden",
          },
        }}
        open
      >
        {content}
      </Drawer>
    </Box>
  );
}