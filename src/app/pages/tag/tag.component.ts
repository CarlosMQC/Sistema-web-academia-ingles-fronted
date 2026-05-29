import { Component, inject } from '@angular/core';
import { TagService } from '../../services/tag.service';
import { Tag } from '../../model/tag';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
})
export class TagComponent {
  protected tags: Tag[] = [];
  private readonly tagService = inject(TagService);

  ngOnInit(): void {
    //this.tagService.findAll().subscribe(data => console.log(data));
    this.tagService.findAll().subscribe(data =>
      this.tags = data);
  }
}
