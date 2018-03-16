import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { Scheduler } from 'rxjs/Scheduler';
import { Book, BookContent } from './book';
import { BooksService } from './books.service';
import * as d3 from 'd3-hierarchy';

import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/distinctUntilChanged';
import { BookActions } from './book.actions';

const PARAGRAPH_STATUS = {
  PRISTINE: 0,
  NEW: 1,
  READ: 2
}
@Component({
  selector: 'app-book-content',
  templateUrl: './book-content.component.html',
  styleUrls: ['./book-content.component.scss']
})
export class BookContentComponent implements OnChanges {
    @Input() bookContent: Array<BookContent>;
    @Input() book: Book;
    @ViewChild('chart') private chartContainer: ElementRef;
    constructor(private store: Store<any>, private bookService: BooksService, private bookActions: BookActions) {}
    ngOnChanges(changes: any) {
      if (changes && changes.bookContent) {}
    }

    proceed(id) {
      this.bookActions.getBookParagraph(this.book.owner, this.book.ref, id);
    }

    reset() {
      // this.currentBookData = [{...this.bookData[0], status: PARAGRAPH_STATUS.PRISTINE}];
    }

    add(data) {
      data.status = PARAGRAPH_STATUS.NEW;
    }

    save(data, linkText, paragraphValue) {
      data.status = PARAGRAPH_STATUS.READ;
      const newParagraph = {
        content: paragraphValue,
        parents: [data._id],
        children: []
      }
      const payload = {
        payload: newParagraph,
        linkText,
        parentId: data._id
      }
      this.bookActions.addNewParagraph(this.book.owner, this.book.ref, payload);
      // newParagraph['status'] = PARAGRAPH_STATUS.PRISTINE;
    }

    calcNestedStructure(data, currentKey, currentNode, keyMap) {
    if (data[currentKey].children.length) {
      for (let i = 0; i < data[currentKey].children.length; i++) {
        const child = data[currentKey].children[i];
        const nextNodeId = child.id || child;

        currentNode.push({ id: nextNodeId, children: [] });

        if (data[nextNodeId].children.length) {
          if (!keyMap[nextNodeId]) {
            keyMap[nextNodeId] = true;
            this.calcNestedStructure(data, nextNodeId, currentNode[i].children, keyMap);
          }
        }
      }
    }
  }
}

//         var root = d3.stratify()
//         .id(function(d) { return d.id; })
//         .parentId(function(d) { return d.parents; })
//         (changes.bookContent.currentValue);
//         debugger;
//         // changes.prop contains the old and the new value...



//         /**
//  * SVG Connected Graph
//  *
//  * by Jon Brennecke
//  * twitter.com/jonbrennecke
//  */

// // Vertex object
// function Vertex ( el, x, y, r ) {
//   this.svg = // get the svg - $(el).closest('svg');
//   this.el = el;
//   this.x = x;
//   this.y = y;
//   this.r = r;
  
//   // Create group and circle elements
//   this.g = d3.select(el).attr('class','vertex');
//   this.circle = this.g.append('svg:circle');
  
//   // Attach drag handler
//   var dragHandler = d3.behavior.drag().on("drag", this.dragmove.bind(this));
//   this.circle.call(dragHandler)
  
//   // Lastly, render the circle
//   this.render();
// }

// // Render the vertex
// Vertex.prototype.render = function () {
  
//   // Set attributes of the circle element
//   this.circle.attr({
//     'cx': this.x,
//     'cy': this.y,
//     'r': this.r
//   });
  
//   // Render the connections
//   var connections = this.svg.data('connections');
//   for ( var i in connections ) {
//     connections[i].render();
//   }
// }

// // Drag callback function
// Vertex.prototype.dragmove = function () {
// 	this.x = d3.event.x;
//   this.y = d3.event.y;
//   this.render();
// }

// /**
//  * Creates a vertex
//  *
//  */
// $.fn.createVertex = function ( x, y, r ) {
//   return $(this).each(function () {
//     $(this).data('vertex', new Vertex(this,x,y,r));
//   });
// }

// function Connection ( v1, v2 ) {
//   this.v1 = v1;
//   this.v2 = v2;
  
//   var connections = d3.select(v1.svg.find('.connections').get(0));
//   this.g = connections.append('svg:g').attr('class','connection');
//   this.path = this.g.append('svg:path').attr('class','connection');

//   // draw a line from the this node (the child) to the parent
//   this.lineFunc = d3.svg.line()
//     .x(function(d) { return d[0]; })
//     .y(function(d) { return d[1]; })
//     .interpolate('bundle');
  
//   // Render the connection
//   this.render();
// }

// Connection.prototype.render = function () {
//   this.path.attr('d', this.lineFunc([
//     [ this.v1.x, this.v1.y + 0.5 * this.v1.r ],
//     [ this.v1.x, this.v1.y - this.v1.r ],
//     [ this.v2.x, this.v2.y + this.v2.r ],
//     [ this.v2.x, this.v2.y - 0.5 * this.v2.r ]
//   ]));
// }

// /**
//  * Creates a connection between two vertex nodes
//  *
//  */
// $.fn.connect = function ( v ) {
//   var v1 = $(this).data('vertex');
//   return $(v).each(function () {
//     var v2 = $(v).data('vertex');
//     var svg = $(this).closest('svg');
//     var connection = new Connection(v1,v2);
//     svg.data('connections').push(connection);
//   });
// }

// /**
//  * Creates a directed graph
//  *
//  */
// $.fn.digraph = function ( vertices ) {
//   return $(this).each(function () {
//     // The container element
//     var c = $(this);
//     var height = c.height();
//     var width = c.height();
    
//     // Create an svg element and set its viewbox to match the container.
//     // We only need to set the width, so that the height is responsive.
//     var svg = d3.select(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
//     svg.attr({
//       width: width,
//       viewBox: '0 0 ' + width + ' ' + height,
//       preserveAspectRatio: 'none'
//     });
    
//     // The SVG element will hold an array of all the connections
//     $(svg.node()).data('connections',[]);
    
//     // Resize the svg element when the window is resized
//     // $(window).resize(function () {
//     //   svg.attr({
//     //     width: c.height(),
//     //     viewBox: '0 0 ' + c.height() + ' ' + c.height()
//     //   });
//     // });
    
//     var connectionsGroup = svg.append('svg:g').attr('class','connections');
//     var verticesGroup = svg.append('svg:g').attr('class','vertices');
//     var hash = {}; // hash to store the vertex objects
    
//     // iterate through the vertices to create the vertex objects
//     for ( var i in vertices ) {
//       var x = Math.random() * width;
//       var y = Math.random() * height;
//       var r = 15;
//       var vertex = $(verticesGroup.append('svg:g').node()).createVertex(x,y,r);
// 			hash[i] = vertex;
//     }
    
//     // iterate through again and connect the vertices
//     for ( var i in vertices ) {
//       for ( var j in vertices[i] ) {
//         $(hash[i]).connect(hash[vertices[i][j]]);
//       }
//     }
//     c.append(svg.node());
//   });
// }

// $(function(){
//   $("#container").digraph({
//     0: [],
//     1: [0],
//     2: [0],
//     3: [0],
//     4:[1],
//     5: [1],
//     6: [4],
//     7: [4],
//     8: [6],
//     9: [7,13],
//     10: [8],
//     11: [9],
//     12: [11],
//     13: [5],
//     14: [13],
//     15: [14],
//     16: [14],
//     17: [15],
//     18: [16],
//     19: [2],
//     20: [3],
//     21: [19],
//     22: [19],
//     23: [3],
//     24: [20, 21]
//   });
// });
 