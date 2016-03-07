$('.form_date').datetimepicker({
    format: "yyyy-mm-dd",
    showMeridian: true,
    autoclose: true,
    todayBtn: true,
    language:  'fr',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
});

$('.form_month').datetimepicker({
    format: "yyyy-mm",
    showMeridian: true,
    autoclose: true,
    todayBtn: true,
    language:  'fr',
    weekStart: 1,
    todayBtn:  false,
    autoclose: 1,
    todayHighlight: 1,
    startView: 3,
    minView: 3,
    forceParse: 0
});
