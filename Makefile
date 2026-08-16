.PHONY: help setup check typecheck build storybook

help:
	@echo "design-system — компоненты и токены Layero"
	@echo ""
	@echo "  make check      — типы + сборка витрины"
	@echo "  make typecheck  — tsc --noEmit"
	@echo "  make build      — сборка Storybook"
	@echo "  make storybook  — витрина локально"
	@echo "  make setup      — npm ci"

# ── Проверка ─────────────────────────────────────────────────────────────────
#
# Чего здесь НЕТ и почему:
#  · тестов — их нет ни одного (тикет T-20260816-14);
#  · линтера — не настроен (тот же тикет);
#  · визуальной регрессии — story есть, снимков нет, сравнивать не с чем;
#  · проверки потребителей — ломающая правка примитива проявится не здесь,
#    а в панели. Менял публичный проп — прогони `make -C ../frontend check`.
#
# Сборка витрины входит в `check` намеренно: она единственная, кто реально
# исполняет каждый компонент. Тайпчек ловит форму, сборка — способность
# компонента вообще отрендериться.

typecheck:
	npm run typecheck

build:
	npm run build-storybook

check: typecheck build
	@echo ""
	@echo "✅ ALL CHECKS PASSED"

setup:
	npm ci

storybook:
	npm run storybook
