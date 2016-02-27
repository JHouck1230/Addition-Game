'use strict';

$(document).ready(init);

var starCount;
var rerolls = 3;
var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var tada = 'animated infinite tada';
var hinge = 'animated hinge';
var wobble = 'animated wobble';
var zoomOutDown = 'zoomOutDown';
var bounceOut = 'animated bounceOut';
var bounceOutUp = 'animated bounceOutUp';
var bounceIn = 'animated bounceIn';
var bounceInRight = 'animated bounceInRight';
var bounceInDown = 'animated bounceInDown';

function init() {
	animateIt($('h1'), bounceInRight);
	renderStars();
	$('.numbers').click(clickNum);
	$('#reroll').click(reRoll);
	$('#newGame').click(newGame);
	$('#submit').click(checkNums);
}

function animateIt(element, animation) {
	element.addClass(animation);
	element.one(animationEnd, function() {
			element.removeClass(animation);
		})
}

function checkLose() {
	var $h1 = $('h1');
	var numbers = $('.numbers:not(.disabled)').text().split('');
	var total = eval(numbers.join(' + '));
	 console.log('numbers: ', numbers);
	 console.log('total: ', total);
	 console.log('starCount: ', starCount);
	if(rerolls === 0 && total != starCount) {
		$.text('You Lose!');
		animateIt($h1, hinge);
	} 
}

function reRoll() {
	if(rerolls === 1) {
		rerolls--;
		var $reroll = $('#reroll');
		var $rerolls = $('#rerolls').text();
		$rerolls = parseInt($rerolls) - 1;
		$('#rerolls').text($rerolls);
		animateIt($reroll, zoomOutDown);
		$reroll.addClass('disabled');
		renderStars();
	} else {
		rerolls--;
		var $rerolls = $('#rerolls').text();
		$rerolls = parseInt($rerolls) - 1;
		$('#rerolls').text($rerolls);
		renderStars();
	}
}

function checkWin() {
	if($('.numbers.disabled').length === $('.numbers').length){
		var $h1 = $('h1');
		$h1.text('You Win!');
		animateIt($h1, tada);
	} else {
		renderStars();
	}
}

function checkNums() {
	var $highlight = $('.highlight');
	var numbers = $highlight.text().split('');
	var total = eval(numbers.join(' + '));
	var $h1 = $('h1');
	if(total === starCount) {
		for(var i = 0; i < $highlight.length; i++) {
			animateIt($highlight.eq(i), bounceOut);
			$highlight.addClass('disabled');
			$highlight.removeClass('highlight');
		}
		$h1.text('How Many Stars?');
		animateIt($h1, bounceInRight);
		checkWin();
	} else {
		for(var i = 0; i < $highlight.length; i++) {
			$highlight.eq(i).removeClass('highlight');
		}
		$h1.text('Try Again!');
		animateIt($h1, wobble);
	}
}

function newGame() {
	var $h1 = $('h1');
	var $numbers = $('.numbers');
	var $h1Numbers = $('h1, .numbers');

	for(var i = 0; i < 9; i++) {
		$('.numbers').eq(i).removeClass('disabled highlight animated bounceOut');
	}
	animateIt($numbers, bounceIn);
	$h1.text('How Many Stars?');
	animateIt($h1, bounceInRight);
	rerolls = 3;
	var $reroll = $('#reroll');
	$('#rerolls').text(rerolls);
	$reroll.removeClass('disabled');
	animateIt($reroll, bounceInRight);
	renderStars();
}

function clickNum() {
	$(this).toggleClass('highlight');
}

function renderStars() {
	var $star = $('.star');
	for(var i = 0; i < 9; i++) {
		$star.eq(i).removeClass('disabled');
		animateIt($star.eq(i), bounceInDown);
	}
	var hideCount = Math.floor((Math.random() * 9));
	for(var i = 0; i < hideCount; i++) {
		animateIt($star.eq(i), bounceOutUp);
		$star.eq(i).addClass('disabled');
	}
	starCount = 9 - hideCount;
	checkLose();
}

// function zoomOutDown(element) {
// 	element.addClass(zoomOutDown);
// 	element.one(animationEnd, function() {
// 			element.removeClass(zoomOutDown);
// 		})
// }

// function wobble(element) {
// 	element.addClass(wobble);
// 	element.one(animationEnd, function() {
// 			element.removeClass(wobble);
// 		})
// }

// function hinge(element) {
// 	element.addClass(hinge);
// 	element.one(animationEnd, function() {
// 			element.removeClass(hinge);
// 		})
// }

// function tada(element) {
// 	element.addClass(tada);
// 	element.one(animationEnd, function() {
// 			element.removeClass(tada);
// 		})
// }