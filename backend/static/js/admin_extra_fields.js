jQuery(document).ready(function($) {
    function updateFieldChoices() {
        const counts = {
            'int': 0,
            'str': 0,
            'text': 0,
            'bool': 0,
            'date': 0
        };

        // Подсчитываем количество каждого типа поля, уже выбранных в форме
        $(".field-field_type select option:selected").each(function() {
            const val = $(this).val();
            if (counts[val] !== undefined) {
                counts[val]++;
            }
        });

        // Обновляем доступные опции для каждого селекта
        $(".field-field_type select").each(function() {
            for (const fieldType in counts) {
                if (counts[fieldType] >= 3) {
                    $(this).find(`option[value=${fieldType}]`).prop('disabled', true);
                } else {
                    $(this).find(`option[value=${fieldType}]`).prop('disabled', false);
                }
            }
        });
    }

    // Обновляем опции каждый раз, когда выбирается тип поля
    $(document).on('change', ".field-field_type select", function() {
        updateFieldChoices();
    });

    // Первоначальное обновление опций при загрузке страницы
    updateFieldChoices();
});
