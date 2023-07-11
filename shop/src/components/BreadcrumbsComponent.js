import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default function BreadcrumbsComponent({ name, path }) {
  const { t } = useTranslation();

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/">
          <StyledBreadcrumb
            label={t("Home")}
            icon={<HomeIcon color="primary" fontSize="small" />}
          />
        </Link>
        {name === "Checkout" && (
          <Link to="/cart">
            <StyledBreadcrumb label={t("Cart")} />
          </Link>
        )}
        {name === "Login" && (
          <Link to="/account">
            <StyledBreadcrumb label={t("Account")} />
          </Link>
        )}
        {name === ("د ثبت نوم" || "Sign Up") && (
          <Link to="/account">
            <StyledBreadcrumb label={t("Account")} />
          </Link>
        )}

        <Link to={path}>
          <StyledBreadcrumb label={name} />
        </Link>
      </Breadcrumbs>
    </div>
  );
}
