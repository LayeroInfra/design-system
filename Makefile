.PHONY: help setup check typecheck build storybook fields

help:
	@echo "design-system — компоненты и токены Layero"
	@echo ""
	@echo "  make check      — типы + сборка витрины + CSS полей"
	@echo "  make fields     — перегенерировать styles/fields.css"
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

# Вид полей ввода для поверхностей БЕЗ React и Tailwind (статический лендинг).
# Файл генерируется из токенов и классов компонентов — правится источник, не он.
fields:
	node scripts/gen-fields-css.mjs

# `--check` в общей проверке: отставший styles/fields.css — это разъехавшиеся
# поля на layero.ru при зелёном прогоне здесь. Файл вендорится в
# frontend/landing, то есть уезжает за пределы этого репозитория.
check-fields:
	node scripts/gen-fields-css.mjs --check

check: typecheck build check-fields
	@echo ""
	@echo "✅ ALL CHECKS PASSED"

setup:
	npm ci

storybook:
	npm run storybook
