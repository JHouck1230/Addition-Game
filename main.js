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

function reRoll() {
	rerolls--;
	if(rerolls === 0) {	
		var $reroll = $('#reroll');
		$reroll.addClass('disabled');
	}
	renderStars();
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
		if($h1.text() ===  'Try Again!') {
			$h1.text('How Many Stars?');
			animateIt($h1, bounceInDown);
		}
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
	$star.each(function(i, value) {
		$star.eq(i).removeClass('disabled');
		animateIt($star.eq(i), bounceInDown);
	})
	var hideCount = Math.floor((Math.random() * 9));
	for(var i = 0; i < hideCount; i++) {
		$star.eq(i).addClass('disabled');
	}
	starCount = 9 - hideCount;
}









