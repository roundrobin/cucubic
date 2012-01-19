$(function() {
	$(".connectedSortable").sortable({
		items : "li:not(.ui-state-disabled)",
		connectWith : ".connectedSortable1",
		/*
		 * Sobald ein neues Element empfangen wurde, werden folgende Dinge getan
		 * 1. Cancel-Button anzeigen
		 * 2. Cancel-Button OnClick-Handler registrieren (Erklärung der Funktion, s.u.)
		 * 3. Überprüfen wie viele Elemente enthalten
		 */
		receive : function(event, ui) {
			console.log("receive on #QBDropListRow: " + ui.item);
			ui.item.find(".cancelButton").css("display", "inline");

			if(($("#QBDropListCol li").length > 2)) {
				$(ui.sender).sortable('cancel');
				$(ui.item).find(".cancelButton").css("display", "none");
			}

			if(($("#QBDropListRow li").length > 2)) {
				$(ui.sender).sortable('cancel');
				$(ui.item).find(".cancelButton").css("display", "none");
			}

			if(($("#QBDropListPages li").length > 2)) {
				$(ui.sender).sortable('cancel');
				$(ui.item).find(".cancelButton").css("display", "none");
			}
			/*
			 * Vorgang:
			 * 1. Oberelement des Cancel-Buttons finden.
			 * 2. Bestimmte Css-Klassen entfernen
			 * 3. Cancel-Button auf der Kopie des LI-Elements ausblenden
			 * 4. LI-Kopie zu Startliste hinzufügen
			 */
			ui.item.find(".cancelButton").bind('click', function() {
				listItem = $(this).parent();
				cloneItem = listItem.clone();
				cloneItem.find(".cancelButton").css("display", "none");
				$("." + $(listItem).data("list")).append(cloneItem);
				listItem.remove();
				this.unbind("click");
			});
		},
		/*
		 * Sobald man aus dem QB raus draggt werden alle anderen Liste außer der erlaubten deaktiviert
		 */
		create : function(event, ui) {
			console.log("create: " + ui.item)
		},
		start : function(event, ui) {
			$('.connectedSortable1').not("." + $(ui.item).data("list")).each(function() {
				$(this).sortable('disable');
			});
		},
	}).disableSelection();

	/*
	 * Macht die Dimensions UL-Liste Drag- und Sortierbar
	 * Kümmert sich darum das nur richtige Items eingefügt werden
	 */
	$(".dimensionList, #measureList").sortable({
		/*
		 * Wird nur ausgelößt wenn ein komplett neues Element der List zugefügt wurde
		 */
		receive : function(event, ui) {
			console.log("receive on .dimensionList: " + ui.item)
			/*
			 * IF: Das Item nur einfuegen wenn die Ursprungsliste die selbe ist.
			 */
			if(!($(this).is("." + $(ui.item).data("list")))) {

				$(ui.sender).sortable('cancel');
				$('.connectedSortable1').each(function() {
					$(this).sortable('enable');
				});
			} else {
				$('.connectedSortable1').each(function() {
					$(this).sortable('enable');
				});
				ui.item.find(".cancelButton").css("display", "none");
			}
		},
		connectWith : ".connectedSortable"
	}).disableSelection();

	$("#sendCall").click(function() {
		colValue = $("#QBDropListCol li").last().data("rootmember");
		rowValue = $("#QBDropListRow li").last().data("rootmember");
		pageValue = $("#QBDropListPages li").last().data("rootmember");
		colDimension = $("#QBDropListCol li").last().data("dimension");
		rowDimension = $("#QBDropListRow li").last().data("dimension");
		pageDimension = $("#QBDropListPages li").last().data("dimension");

		$.getJSON('/query/' + colValue + '/' + rowValue + '/' + pageValue + '/' + colDimension + '/' + rowDimension + '/' + pageDimension, function(data) {
			console.log(scene.objects);
			createTable(data['columnNames'], data['rowNames'], data['values']);
		});
	});
});
