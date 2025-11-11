import { Component, DestroyRef, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApplicationListService } from '../../services/application-list-service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-delete-confirmation',
  imports: [MatDialogModule],
  templateUrl: './delete-confirmation.html',
  styleUrl: './delete-confirmation.css'
})
export class DeleteConfirmation {
  readonly dialogRef = inject(MatDialogRef<DeleteConfirmation>);
  private readonly destroyRef = inject(DestroyRef);
  private applicationListService = inject(ApplicationListService);

  onCancel(): void {
    this.dialogRef.close();
  }

  deleteAllClicked(): void {
    this.applicationListService.deleteAllAplications()
      .pipe(tap(() => takeUntilDestroyed(this.destroyRef)))
      .subscribe();
    this.dialogRef.close();
  }
}
